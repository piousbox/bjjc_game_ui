import { expect }     from 'chai'

import TgmApi from '../TgmApi.jsx'

describe('TgmApi', () => {
  it('is sane', () => {
    let tgmApi = TgmApi;
    expect( tgmApi.profile ).to.be.a('string')
    expect( tgmApi.fbLogin ).to.be.a('string')
  });
});
