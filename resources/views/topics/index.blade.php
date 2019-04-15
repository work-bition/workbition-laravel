@extends('layouts.app')

@section('title', isset($category) ? $category->name : '话题列表')

@section('content')

  <div class="row mb-5">

    <div class="col-lg-9 col-md-9 topic-list">

      <ul class="navbar-nav mr-auto">

        <li class="nav-item active"><a class="nav-link" href="{{ route('topics.index') }}">话题</a></li>

        <li class="nav-item"><a class="nav-link" href="{{ route('categories.show', 1) }}">分享</a></li>

        <li class="nav-item"><a class="nav-link" href="{{ route('categories.show', 2) }}">教程</a></li>

        <li class="nav-item"><a class="nav-link" href="{{ route('categories.show', 3) }}">问答</a></li>

        <li class="nav-item"><a class="nav-link" href="{{ route('categories.show', 4) }}">公告</a></li>

      </ul>

      @if (isset($category))

        <div class="alert alert-info" role="alert">

          {{ $category->name }} ：{{ $category->description }}

        </div>

      @endif

      <div class="card ">

        <div class="card-header bg-transparent">

          <ul class="nav nav-pills">

            <li class="nav-item"><a class="nav-link active" href="#">最后回复</a></li>

            <li class="nav-item"><a class="nav-link" href="#">最新发布</a></li>

          </ul>

        </div>

        <div class="card-body">

          {{-- 话题列表 --}}
          @include('topics._topic_list', ['topics' => $topics])

          {{-- 分页 --}}
          <div class="mt-5">

            {!! $topics->appends(Request::except('page'))->render() !!}

          </div>

        </div>

      </div>

    </div>

    <div class="col-lg-3 col-md-3 sidebar">

      @include('topics._sidebar')

    </div>

  </div>

@endsection
