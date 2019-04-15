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
}
