<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function root()
    {

      //dd(\Auth::user()->hasVerifiedEmail());

      return view('pages.root');

    }
    public function showCourses()
    {

      //dd(\Auth::user()->hasVerifiedEmail());

      return view('pages.root');

    }
    public function showColumns()
    {

      //dd(\Auth::user()->hasVerifiedEmail());

      return view('pages.root');

    }
    public function showShortTutorials()
    {

      //dd(\Auth::user()->hasVerifiedEmail());

      return view('pages.root');

    }
    public function showArticles()
    {

      //dd(\Auth::user()->hasVerifiedEmail());

      return view('pages.root');

    }
    public function showRecommendations()
    {

      //dd(\Auth::user()->hasVerifiedEmail());

      return view('pages.root');

    }
    public function showLearningFramework()
    {

      //dd(\Auth::user()->hasVerifiedEmail());

      return view('pages.root');

    }

    public function permissionDenied()
    {
        // 如果当前用户有权限访问后台，直接跳转访问
        if (config('administrator.permission')()) {

            return redirect(url(config('administrator.uri')), 302);

        }

        // 否则使用视图
        return view('pages.permission_denied');

    }
    
}
