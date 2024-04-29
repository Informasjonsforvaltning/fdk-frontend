import { redirect } from 'next/navigation';
import { paths } from '@fdk-frontend/utils';

const Index = async () => redirect(paths.dataHunter);

export default Index;
