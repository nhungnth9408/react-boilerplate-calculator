import { takeLatest, put } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
// import request from 'utils/request';reposLoaded,
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import githubData, { getRepos } from '../saga';

const username = 'mxstbr';

/* eslint-disable redux-saga/yield-effects */
describe('getRepos Saga', () => {
  let getReposGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos();

    const selectDescriptor = getReposGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getReposGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = [
      {
        name: 'First repo',
      },
      {
        name: 'Second repo',
      },
    ];
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(reposLoaded(response, username)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    // put(repoLoadingError(err));
    const response = new Error('Some error');
    const putDescriptor = getReposGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(repoLoadingError(response)));
  });
});

describe('Test githubData', () => {
  const githubDataSata = githubData();
  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = githubDataSata.next().value;
    // console.log('Calculator saga.test: ', takeLatestDescriptor);
    // console.log('Calculator saga.test: ', takeLatest(LOAD_REPOS, getRepos));
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_REPOS, getRepos));
  });
});
