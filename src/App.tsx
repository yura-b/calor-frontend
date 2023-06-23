import { BrowserRouter } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import AppRouter from './routes/routes';
import { setLanguages } from '@/store/reducers/LanguageReducer.ts';
import { errorCorrupted, loading } from '@/store/reducers/StatusReducer.ts';
import { getTexts } from '@/api/languages.ts';

const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useQuery('repoData', () =>
    getTexts().then((data) => {
      console.log(data);
      dispatch(setLanguages(data.data));
    })
  );
  if (error) dispatch(errorCorrupted('something went wrong'));
  if (isLoading) dispatch(loading());

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
