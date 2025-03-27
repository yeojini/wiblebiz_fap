import { BeatLoader } from 'react-spinners';
import styles from './Loading.module.scss';

type LoadingProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function Loading({ className, children }: LoadingProps) {
  return (
    <div className={`${styles.container} ${className}`} role="status">
      <BeatLoader />
      {children}
    </div>
  );
}
