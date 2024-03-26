import { AnErrorOccurred } from '@strapi/helper-plugin';
import { Switch, Route } from 'react-router-dom';

import { PLUGIN_ID } from '../pluginId';

import { HomePage } from './HomePage';

const App = () => {
  return (
    <Switch>
      <Route path={`/plugins/${PLUGIN_ID}`} component={HomePage} exact />
      <Route component={AnErrorOccurred} />
    </Switch>
  );
};

export { App };
