import { RootHtml, metaFor, viewport } from '../shared';

export const metadata = metaFor('fr');
export { viewport };

export default function Layout({ children }) {
  return <RootHtml lang="fr">{children}</RootHtml>;
}
