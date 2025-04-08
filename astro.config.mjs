// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import minify from 'astro-min';

import cloudflare from '@astrojs/cloudflare';

import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap(),
    minify({
      do_not_minify_doctype: false,
      ensure_spec_compliant_unquoted_attribute_values: false,
      keep_closing_tags: false,
      keep_comments: false,
      keep_html_and_head_opening_tags: false,
      keep_input_type_text_attr: false,
      keep_spaces_between_attributes: false,
      keep_ssi_comments: false,
      minify_css: false,
      minify_js: false,
      preserve_brace_template_syntax: false,
      preserve_chevron_percent_template_syntax: false,
      remove_bangs: false,
      remove_processing_instructions: false,
    }),
    compressor(),
  ],

  // Cloudflare adapter
  output: 'static',
  adapter: cloudflare(),
});
