import path from 'path';

import { getMdxFiles, getNestedMapFromPathnames } from '../../../../../../libs/utils/src/lib/file-tree';

const Sidebar = ({ locale }) => {

	const files = getMdxFiles(path.join(process.cwd(), 'src/app/[lang]/docs'));

	const map = getNestedMapFromPathnames(files);

	console.log(map);

	const renderNestedList = (data, basePath = '') => {
    return (
        <ul>
            {Object.keys(data).map(key => (
                <li key={key}>
                    <a href={`${basePath}${key}`}>{key}</a>
                    {Object.keys(data[key]).length > 0 && renderNestedList(data[key], `${basePath}${key}/`)}
                </li>
            ))}
        </ul>
    );
	};

	return (
		<div>
			Sidebar
			{renderNestedList(map, `/${locale}/docs/`)}
		</div>
	);
}

export default Sidebar;