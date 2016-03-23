#Sego
Powerful web server for frontend engineer guy

##What Sego can do
sego totally can do anything that backend code do

##How to install
```
npm install -g sego
```

##How to run
```
$ cd  yourProjectDir
$ sego
Sego 0.1.2
 running on  8080
```


##Examples

### Hello world
index.html
```
<html>
  <body>
    <h1>Hello World</h1>
    my name {{myname}}

    <script type="server">
      sego.render({myname:'lukluk'})
    </script>

  </body>
</html>
```

### CSS3 Selector and DOM modification
index.html
```
<html>
  <body>

    <div class="userOnly">
      <a href="pro.zip" > Download PRO </a>
    </div>
    <div id="message"></div>
    <script type="server">
      if(!sego.session.logged){
         $('.userOnly').remove()     
         $('#message').html('you not authorized to access this page')
      }
      sego.render()
    </script>

  </body>
</html>
```

### URL parameter
index.html?name=lukluk
```
<html>
  <body>

    <h1>Hello World</h1>
    my name {{name}}

    <script type="server">
    sego.render(sego.params)
    </script>

  </body>
</html>

```

### localStorage
index.html
```
<html>
  <body>

    hi your name <strong>{{name}}</strong>

    <script type="server">
    var data = {}
    var data.name = localStorage.getItem('name')

    sego.render(data)
    </script>

  </body>
</html>
```

### Session
index.html
```
<html>
  <body>
    {{#if logged}}
      welcome {{name}}
    {{/if}}

    <script type="server">
    //after success login
    sego.session.logged = true
    sego.session.name = 'lukluk'

    var data = {}
    data.logged=sego.session.logged

    if(data.logged) data.name=sego.session.name

    sego.render(data)
    </script>
  </body>
</html>
```

### Model
index.html
```
<html>
  <body>
    <ul>
    {{#each users}}
      <li>{{username}} {{email}}</li>
    {{/each}}
    </ul>

    <script type="server">
    var user=sego.model('user')

    user.insert({username: 'lukluk', password: '123', email: '123@qq.com'})
      .then(function(u){    	
        return u
    	})
      .then(function(){
        user.find({}).then(function(users){
          sego.render({users:users})
        });
      })
    </script>
  </body>
</html>
```

### Connect Database
index.html
```
<html>
<body>
{{#if error}}
  <h1 class="error">{{error}}</h1>
{{/if}}

<ul>
{{#each users}}
  <li>{{username}}</li>
{{/each}}
</ul>

</body>
</html>

<script type="server">
  var data={}
  sego.mysql_connection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'demo'
  })
  if(!sego.mysql){
    data.error="cannot connect database"
    sego.render(data)
    return false
  }
  sego.mysql.query('select * from users',function(err,rows,fields){
    sego.mysql_disconnect()
    sego.render({error:err,users:rows})
  })
</script>
```
