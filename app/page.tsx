import Terminal from './components/Terminal';
import content from './content';

export default function Home() {
  return (
    <main>
      <Terminal content={content} />
    </main>
  );
}
