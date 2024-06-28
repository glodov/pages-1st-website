const { join } = require('node:path');

const ROOT_DIR = join(__dirname, '.');
// required to define a default value for the proper return of the object, 
// because runtime.get() is not available at this time.
const DATA_DIR = join(ROOT_DIR, 'data');
const STATIC_DIR = join(ROOT_DIR, 'static');

// @todo load .env.vault for the production
// require('dotenv').config();

const basicNeeds = {
	ROOT_DIR,
	DATA_DIR,
	STATIC_DIR,
	// STATIC_THUMB_DIR,
	HOST: 'https://nanoweb.yaro.page',
	SERVER_PORT: 3366,
	STATIC_ALLOWED: [
		'/favicon.ico',
		'/search/',
		'/css/',
		'/js/',
		'/img/',
		'/thumb/',
		'/translation.',
		'/sitemap.',
		'/sitemaps',
		'/robots.txt'
	],
	'render/robots.txt': {
		rows: [
			'User-agent: *',
			'Allow: /',
		]
	},
	'render/search': {
		blockRowsLimit: 0,
		blockSizeLimit: 0,
		gallery: null,
		divider: "\n\n",
		imageKeys: ['ogImage', 'image', 'thumb'],
		categories: [
		],
	},
	gallery: { thumb: '4-3-h300px-q90', alwaysWEBP: false },
	// PLUGINS_DIR/server/api.js => async (req, res, renderOptions) => { sendJson(); }
	handlers: [
		// 'server/api'
	],
	// or provide a custom directory by the second argument
	// addTheme('nano', '/home/themes/nano');
	themes: [
		'nano'
	],
};
module.exports = {
	private: () => (
		{
			...basicNeeds,
			'render/modules': {
				item: [
					'gallery',
					'redirects',
					'dev',
					'references', // $ref: to the files of directory (terms and tariffs)
					'translations',
					'html',
				],
				html: [],
				final: [],
			}
		}
	),
	public: () => (
		{
			...basicNeeds,
			'render/modules': {
				item: [
					'search',
					'gallery', // gallery after search to render search thumbs
					'htaccess',
					'redirects',
					'robotsTXT',
					'sitemapXML',
					'translations',
					'dev',
					'references', // $ref: to the files of directory (terms and tariffs)
					'html',
				],
				html: [
					'scripts',
					'styles',
					'emails',
					'links',
					'minify',
					'save',
				],
				final: [
					'broken'
				],
			},
			'publish/method': 'api',
			'publish/auth': '.env',
			// available only in api method
			'publish/chunkSize': 99 * 1024 * 1024, 
		}
	),
	render: {
		search: () => (
			{
				...basicNeeds,
				'render/modules': { item: ['search'] }
			}
		),
		index: () => (
			{
				...basicNeeds,
				'render/modules': { item: ['translations', 'sitemapXML'] }
			}
		)
	}
};
