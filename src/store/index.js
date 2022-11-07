import {createStore} from 'vuex';
import {auth} from '@/store/modules/auth';
import {feed} from '@/store/modules/feed';
import {popularTags} from './modules/popularTags';

export default createStore({
  modules: {
    auth: auth,
    feed: feed,
    popularTags: popularTags,
  },
});
