import * as connect from 'connect';
import * as serveStatic from 'serve-static';
import { join } from 'path';

const distFolder = join(process.cwd(), 'dist/ngx-universal-prerender-demo/browser');
connect()
  .use(serveStatic(distFolder))
  .listen(4001, () => console.log('Server running on 4001...'));
