import { notFound } from 'next/navigation';

export default function NotFoundDummy() {
  notFound();
}

export const metadata: Metadata = {
    title: '404 - data.norge.no',
    description: "Siden ble ikke funnet",
};