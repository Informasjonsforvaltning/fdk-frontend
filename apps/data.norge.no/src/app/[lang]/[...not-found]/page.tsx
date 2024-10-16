import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default function NotFoundDummy() {
  notFound({ test: 'hello' });
}

export const metadata: Metadata = {
    title: '404 - data.norge.no',
    description: "Siden ble ikke funnet",
};