import { RepoList } from './components/repos/repo-list';
import { Layout } from './components/ui/layout';
import { AppProvider } from './provider';

function App() {
  return (
    <AppProvider>
      <Layout>
        <RepoList />
      </Layout>
    </AppProvider>
  );
}

export default App;
