import { redirect } from 'next/navigation';

// Unknown routes fall back to the homepage, as on the original site.
export default function NotFound() {
  redirect('/');
}
