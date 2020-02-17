# Github Action to configure custom npm registry

Configure custom registry with .npmrc file

```yaml
steps:
  - uses: actions/checkout@v1
  - uses: actions/setup-node@v1
    with:
      node-version: '13'
  - uses: Dcode-Evo/actions-npmrc@1
    with:
      registry: 'http://my-custom-registry.here/'
      scope: '@reposcope'
      username: 'my_username'
      password: ${{ secrets.MY_SECRET_PWD }}
      email: 'any@email.com'
      alwaysAuth: true
  - uses: Dcode-Evo/actions-npmrc@1
    with:
      registry: 'http://my-custom-registry.here/'
      scope: '@anotherscope'
```
will result in `.npmrc` file:

```
@reposcope:registry=http://my-custom-registry.here/
//my-custom-registry.here/:_password=<MY-READABLE-PASSWORD>
//my-custom-registry.here/:username=my_username
//my-custom-registry.here/:email=any@email.com
//my-custom-registry.here/:always-auth=true
@anotherscope:registry=http://my-custom-registry.here/
```

You can use it as many times as you want this will append each use
to the same .npmrc file
