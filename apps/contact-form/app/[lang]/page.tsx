import { redirect } from 'next/navigation';
import { paths } from '@fdk-frontend/utils';

const Index = async () => redirect(paths.contactForm);

export default Index;
