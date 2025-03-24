import { Category } from '@/types';
import styles from './page.module.css';

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/faq/category?tab=CONSULT`,
    { cache: 'no-store' },
  );
  const data = (await res.json()) as Category[];

  return (
    <div className={styles.page}>
      {data.map((item: Category) => (
        <div key={item.categoryID}>{item.name}</div>
      ))}
    </div>
  );
}
