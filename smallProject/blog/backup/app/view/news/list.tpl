<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <div class="news-view view">
      {% for item in list %}
        <div class="item">
          <a href="{{ helper.relativeTime(item.id) }}">{{ item.name }}</a>
        </div>
      {% endfor %}
    </div>
  </body>
</html>