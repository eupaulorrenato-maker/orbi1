"""Export the presentation's shared content to PDF, editable PPTX and speaker script.

Run a local Orbi server first. Example:
python scripts/export-presentation.py --url http://127.0.0.1:3200
"""
import argparse
import io
import json
from pathlib import Path

from playwright.sync_api import sync_playwright
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.util import Inches, Pt
from PIL import ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'apresentacao'
DECK = json.loads((ROOT / 'apresentacao' / 'slides.json').read_text())
GREEN, PAPER, INK, GOLD = '123B2F', 'F5F5EC', '143B2E', 'E4BC74'


def measured_height(value, size, width):
    """Conservative wrapping estimate in inches, using a widely available font."""
    font = ImageFont.truetype('DejaVuSans.ttf', round(size * 3))
    lines = 0
    for paragraph in value.split('\n'):
        count, line = 1, ''
        for word in paragraph.split():
            candidate = (line + ' ' + word).strip()
            if line and font.getlength(candidate) > width * 72 * 3:
                count += 1
                line = word
            else:
                line = candidate
        lines += count
    return (lines * size * 1.12 + 4) / 72


def shape(slide, x, y, w, h, color, border=None, rounded=False):
    obj = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if rounded else MSO_SHAPE.RECTANGLE,
                                 Inches(x), Inches(y), Inches(w), Inches(h))
    obj.fill.solid()
    obj.fill.fore_color.rgb = RGBColor.from_string(color)
    if border:
        obj.line.color.rgb = RGBColor.from_string(border)
        obj.line.width = Pt(.8)
    else:
        obj.line.fill.background()
    if rounded:
        obj.adjustments[0] = .07
    return obj


def text(slide, value, x, y, w, h, size=24, color=INK, bold=False, font='Aptos'):
    obj = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame = obj.text_frame
    frame.word_wrap = True
    frame.margin_left = frame.margin_right = 0
    frame.margin_top = frame.margin_bottom = 0
    for i, line in enumerate(value.split('\n')):
        p = frame.paragraphs[0] if i == 0 else frame.add_paragraph()
        p.text = line
        p.font.name = font
        p.font.size = Pt(size)
        p.font.bold = bold
        p.font.color.rgb = RGBColor.from_string(color)
        p.line_spacing = 1.12
        p.space_after = Pt(4)
    return obj


def export_pptx(map_png):
    prs = Presentation()
    prs.slide_width, prs.slide_height = Inches(16), Inches(9)
    prs.core_properties.title = DECK['title']
    prs.core_properties.subject = DECK['objective']
    prs.core_properties.author = 'Orbi Travel'
    prs.core_properties.comments = 'Conteúdo editável. Dados de demonstração e propostas identificados.'
    for i, s in enumerate(DECK['slides']):
        slide = prs.slides.add_slide(prs.slide_layouts[6])
        dark = s['layout'] in ['cover', 'ask', 'closing']
        bg, fg, muted = (GREEN, 'FBFAEC', 'E7F0DC') if dark else (PAPER, INK, '425646')
        slide.background.fill.solid()
        slide.background.fill.fore_color.rgb = RGBColor.from_string(bg)
        shape(slide, 0, 0, 1.9, .055, GOLD)
        text(slide, 'orbi travel.', .75, .36, 4, .5, 25, fg, True, 'Aptos Display')
        text(slide, s['chapter'] + '  /  APRESENTAÇÃO COMERCIAL', 10.15, .45, 5.1, .4, 13, muted)
        if s['layout'] == 'cover':
            text(slide, s['eyebrow'], .76, 1.18, 9, .5, 14, GOLD, True)
            text(slide, s['title'], .75, 1.9, 9.45, 2.25, 60, fg, True, 'Aptos Display')
            text(slide, s['lead'], .78, 4.2, 8.1, 1.15, 27, muted)
            shape(slide, .78, 5.65, .04, 1.05, GOLD)
            text(slide, s['statement'], 1.03, 5.68, 7.65, 1.1, 22, 'F0D39C')
            text(slide, 'Paulo Renato · Estratégia e comunicação\nAndersonn Gonçalves · Produto e desenvolvimento', .78, 7.12, 9, .75, 16, muted)
            slide.shapes.add_picture(io.BytesIO(map_png), Inches(9.85), Inches(1.8), width=Inches(5.4))
            shape(slide, 11.15, 6.5, 3.9, 1.05, PAPER, rounded=True)
            text(slide, 'RECORTE INICIAL · SERGIPE', 11.4, 6.82, 3.45, .45, 17, INK, True)
        else:
            text(slide, s['eyebrow'], .76, 1.02, 14.4, .4, 14, GOLD if dark else '4A6240', True)
            title_size = 42 if len(s['title'].replace('\n', ' ')) > 85 else 46
            text(slide, s['title'], .75, 1.57, 14.5, 1.48, title_size, fg, True, 'Aptos Display')
            text(slide, s['lead'], .78, 3.05, 14.4, .75, 23, muted)
            cards = s.get('cards', [])
            count = len(cards)
            gap = .22
            width = (14.48 - gap * (count - 1)) / count
            has_statement = bool(s.get('statement'))
            top = 4.0
            height = 3.65 if not has_statement else 3.05
            if s['layout'] == 'hub':
                shape(slide, .76, 3.87, 14.48, .53, GREEN, rounded=True)
                text(slide, s['statement'], 1, 3.97, 14, .4, 16, 'F5F3E4', True)
                top = 4.63
                height = 3.15
            for n, card in enumerate(cards):
                left = .76 + n * (width + gap)
                fill = '1B4937' if dark else 'FFFDF6'
                if s['layout'] in ['equation', 'comparison'] and n == count - 1:
                    fill = 'E3ECD6'
                shape(slide, left, top, width, height, fill, '779465' if dark else 'C6D1BD', True)
                label_size = 13 if count == 4 else 14
                label_height = measured_height(card['label'], label_size, width - .48) + .03
                text(slide, card['label'], left + .24, top + .24, width - .48, label_height, label_size,
                     GOLD if dark else '4C6241', True)
                cursor = top + .24 + label_height + .18
                if card.get('number'):
                    text(slide, card['number'], left + .24, cursor, width - .48, .68,
                         36 if len(card['number']) <= 11 else 33, fg, True, 'Aptos Display')
                    cursor += .84
                title_size = 23 if count == 4 else 25
                title_height = measured_height(card['title'], title_size, width - .48) + .03
                text(slide, card['title'], left + .24, cursor, width - .48, title_height,
                     title_size, fg, True, 'Aptos Display')
                cursor += title_height + .12
                body_size = 23
                available = top + height - cursor - .2
                while measured_height(card['text'], body_size, width - .48) > available and body_size > 20:
                    body_size -= 1
                if measured_height(card['text'], body_size, width - .48) > available:
                    raise ValueError(f'Texto exige revisão no PowerPoint: slide {i+1}, {card["title"]}')
                text(slide, card['text'], left + .24, cursor, width - .48, top + height - cursor - .18,
                     body_size, 'EDF3E4' if dark else '425646')
            if has_statement and s['layout'] != 'hub':
                shape(slide, .76, 7.22, 14.48, .59, '244F3B' if dark else 'E6ECD9')
                text(slide, s['statement'], 1.0, 7.34, 14, .45, 20, GOLD if dark else INK)
        shape(slide, .76, 8.25, 14.48, .01, '668460' if dark else 'C7D0BD')
        text(slide, s['footer'], .76, 8.43, 13.7, .45, 13, muted)
        text(slide, f'{i+1:02d} / {len(DECK["slides"])}', 14.5, 8.4, .8, .45, 16, fg)
        slide.notes_slide.notes_text_frame.text = (
            f'{s["owner"]} · aproximadamente {s["seconds"]} segundos\n\n'
            f'{s["notes"]}\n\nPonte ao próximo slide: {s["transition"]}'
        )
    prs.save(OUT / 'orbi-travel-apresentacao.pptx')


def export_script():
    minutes = round(sum(s['seconds'] for s in DECK['slides'] if s['chapter'] != 'Apoio') / 60)
    chunks = [f'# {DECK["title"]}', f'\n{DECK["version"]}\n',
              f'Objetivo: {DECK["objective"]}',
              f'\n25 slides de sequência principal, cerca de {minutes} minutos de fala; quatro slides de apoio. Reserve tempo adicional às perguntas.\n',
              '## Uso do material\n\nAbra `/apresentacao/`. Setas avançam e voltam; F ativa tela cheia; N abre o roteiro. O índice permite saltar de assunto. No celular, os slides viram páginas de leitura, sem reduzir a fonte. O PDF contém todos os slides, e o PowerPoint tem textos editáveis e notas de fala.\n',
              '## Antes do encontro\n\nConfirmar nome e cargo do interlocutor. Combinar quem fala sobre negócio e quem demonstra o produto. Ensaiar sem depender do protótipo. Usar somente dados fictícios. O piloto é uma proposta; não há parceria ou indicação institucional formalizada. O pedido desta apresentação é apoio institucional, aproximação com agências e avaliação de indicação do sistema.\n']
    for i, s in enumerate(DECK['slides']):
        title = s['title'].replace('\n', ' ')
        chunks.append(f'## {i+1:02d} — {title}\n\n{s["chapter"]} · {s["owner"]} · ~{s["seconds"]} segundos\n\n### Na tela\n\n{s["lead"]}\n')
        for c in s.get('cards', []):
            number = f' · {c["number"]}' if c.get('number') else ''
            chunks.append(f'- **{c["title"]}{number}:** {c["text"]}')
        if s.get('statement'):
            chunks.append(f'\n{s["statement"]}')
        chunks.append(f'\n### Fala e contexto\n\n{s["notes"]}\n\n**Ponte:** {s["transition"]}\n\n**Nota do slide:** {s["footer"]}\n')
    (OUT / 'roteiro-comercial.md').write_text('\n\n'.join(chunks), encoding='utf-8')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', default='http://127.0.0.1:3200')
    parser.add_argument('--chromium', default='/usr/bin/chromium')
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    (ROOT / 'docs').mkdir(exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=args.chromium, args=['--no-sandbox'], headless=True)
        page = browser.new_page(viewport={'width': 540, 'height': 560})
        page.goto(args.url + '/images/presentation-brazil.svg', wait_until='networkidle')
        map_png = page.screenshot(omit_background=True)
        page.set_viewport_size({'width': 1760, 'height': 1200})
        page.goto(args.url + '/apresentacao/', wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        page.locator('.slide:not([hidden])').screenshot(path=str(ROOT / 'docs' / 'apresentacao-preview.png'))
        page.emulate_media(media='print')
        page.pdf(path=str(OUT / 'orbi-travel-apresentacao.pdf'), print_background=True,
                 prefer_css_page_size=True, display_header_footer=False)
        browser.close()
    export_pptx(map_png)
    export_script()
    print(f'Exportados {len(DECK["slides"])} slides: PDF, PowerPoint editável e roteiro em {OUT}')


if __name__ == '__main__':
    main()
