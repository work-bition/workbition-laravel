<nav id="main_nav">

  <div class="ui container">

    <div class="content">

      <div class="left menu">

          <a href="{{ route('root') }}" class="item {{ active_class(if_route('root')) }}"><i class="large compass outline icon"></i> 首页 </a>

          <a href="{{ route('courses') }}" class="item {{ active_class(if_route('courses')) }}"><i class="large book icon"></i> 课程 </a>

          <a href="{{ route('columns') }}" class="item {{ active_class(if_route('columns')) }}"><i class="large newspaper outline icon"></i> 专栏 </a>

          <a href="{{ route('short-tutorials') }}" class="item {{ active_class(if_route('short-tutorials')) }}"><i class="large bullseye icon"></i> 1分钟有用功 </a>

          <a href="{{ route('articles') }}" class="item {{ active_class(if_route('articles')) }}"><i class="large file alternate outline icon"></i> Bigger 文章 </a>

          <a href="{{ route('recommendations') }}" class="item {{ active_class(if_route('recommendations')) }}"><i class="large star outline icon"></i> 内容选荐 </a>

          <a href="{{ route('learning-framework') }}" class="item {{ active_class(if_route('learning-framework')) }}"><i class="large window restore outline icon"></i> 知识框架 </a>

          <!-- <a href="#" class="item"><i class="large bell outline icon"></i> 限时免费课程 </a> -->

      </div>

    </div>

  </div>

</nav>
