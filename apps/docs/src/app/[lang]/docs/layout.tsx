import path from 'path';

import { getMdxFiles, getNestedMapFromPathnames } from '../../../../../../libs/utils/src/lib/file-tree';

const DocsLayout = (props) => {

	const files = getMdxFiles(path.join(process.cwd(), 'src/app/[lang]/docs'));

	const map = getNestedMapFromPathnames(files);

	console.log(map);

	return (
		<div>
			<ul>
      {
        files.map(file => (<li>{file}</li>))
      }
      </ul>
			Hello
			{props.children}
		</div>
	);
}

export default DocsLayout;