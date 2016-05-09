/* global describe it beforeEach expect sinon */
/* eslint no-unused-expressions: "off" */

import fallback from '../lib'

describe('constructor', () => {
  it('returns something that looks like a middleware', () => {
    const middleware = fallback()
    expect(middleware.length).to.equal(3)
  })
})

describe('middleware', () => {
  const next = sinon.stub()
  const args = [(req, res) => res.send()]
  let middleware
  beforeEach(() => {
    middleware = fallback(...args)
  })
  it('accepts HTML requests', () => {
    const req = { method: 'GET', accepts: sinon.stub().returns('html') }
    const res = { send: sinon.stub() }
    expect(middleware(req, res, next)).to.be.undefined
    expect(req.accepts).always.have.been.calledWithMatch('html')
    expect(res.send).always.have.been.called
    expect(next).not.to.have.been.called
  })
  it('ignores non-HTML requests', () => {
    const req = { method: 'GET', accepts: sinon.stub().returns('') }
    const res = { send: sinon.stub() }
    expect(middleware(req, res, next)).to.be.undefined
    expect(req.accepts).always.have.been.calledWithMatch('html')
    expect(res.send).not.to.have.been.called
    expect(next).to.have.been.called
  })
  it('ignores non-GET requests', () => {
    const req = { method: 'POST', accepts: sinon.stub() }
    const res = { send: sinon.stub() }
    expect(middleware(req, res, next)).to.be.undefined
    expect(req.accepts).not.to.have.been.called
    expect(res.send).not.to.have.been.called
    expect(next).to.have.been.called
  })
})
