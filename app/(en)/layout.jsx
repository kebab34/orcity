import { RootHtml, metaFor, viewport } from '../shared';

export const metadata = metaFor('en');
export { viewport };

export default function Layout({ children }) {
  return <RootHtml lang="en">{children}</RootHtml>;
}
