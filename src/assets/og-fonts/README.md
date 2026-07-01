# OG image fonts

Static TTFs used by `src/pages/og/[...route].ts` to render the OpenGraph images
with `astro-og-canvas`. That generator uses CanvasKit's `ParagraphBuilder.Make`,
which does **not** do glyph-level fallback across families, so each family must
be a single file that covers every glyph we render — including the Turkish
Latin-Extended glyphs (ğ, ş, ı, İ) in the TR taglines.

These files are the Fontsource `latin` + `latin-ext` subsets merged into one
typeface per weight. To regenerate:

```sh
# latin (ASCII + Latin-1) subsets
curl -sSfL -o inter-700.ttf       https://api.fontsource.org/v1/fonts/inter/latin-700-normal.ttf
curl -sSfL -o jetbrains-500.ttf   https://api.fontsource.org/v1/fonts/jetbrains-mono/latin-500-normal.ttf
# latin-ext (adds ğ, ş, ı, İ, …)
curl -sSfL -o inter-700-ext.ttf     https://api.fontsource.org/v1/fonts/inter/latin-ext-700-normal.ttf
curl -sSfL -o jetbrains-500-ext.ttf https://api.fontsource.org/v1/fonts/jetbrains-mono/latin-ext-500-normal.ttf

# merge each pair (pip install fonttools)
pyftmerge inter-700.ttf inter-700-ext.ttf         --output-file=inter-700-full.ttf
pyftmerge jetbrains-500.ttf jetbrains-500-ext.ttf --output-file=jetbrains-500-full.ttf
```

Internal family names (referenced in the `families` option): `Inter` and
`JetBrains Mono Medium`.

- Inter — SIL Open Font License 1.1 (© The Inter Project Authors)
- JetBrains Mono — SIL Open Font License 1.1 (© The JetBrains Mono Project Authors)
