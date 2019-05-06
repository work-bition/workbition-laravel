<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\MustVerifyEmail as MustVerifyEmailTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;
use Auth;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmailContract
{

    use HasRoles;

    use MustVerifyEmailTrait;

    use Notifiable {

      notify as protected laravelNotify;

    }

    use Traits\ActiveUserHelper;

    use Traits\LastActivedAtHelper;

    public function notify($instance)
    {

      // 如果要通知的人是当前用户，就不必通知了！
      // 这会导致框架自带的「重新发送邮件」的功能失效！！！
      if ($this->id == Auth::id()) {

        return;

      }

      // 只有数据库类型通知才需提醒，直接发送 Email 或者其他的都 Pass
      if (method_exists($instance, 'toDatabase')) {

        $this->increment('notification_count');

      }

      $this->laravelNotify($instance);

    }

    public function markAsRead()
    {

      $this->notification_count = 0;

      $this->save();

      $this->unreadNotifications->markAsRead();

    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    //$fillable 属性的作用是防止用户随意修改模型数据，只有在此属性里定义的字段，才允许修改，否则更新时会被忽略。
    protected $fillable = [
        'name', 'phone', 'email', 'password', 'avatar', 'introduction'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function topics()
    {

      return $this->hasMany(Topic::class);

    }

    public function replies()
    {

      return $this->hasMany(Reply::class);

    }

    public function isAuthorOf($model)
    {

      return $this->id == $model->user_id;

    }

    public function setPasswordAttribute($value)
    {

      //ResetsPasswords trait也会调用password访问器
      //注册规则已设定密码长度不大于20
      //如果值的长度大于 20，即认为是已经做过加密的情况
      if (strlen($value) <= 20) {

          // 小于等于 20，做密码加密处理
          $value = bcrypt($value);

      }

      $this->attributes['password'] = $value;

    }

    public function setAvatarAttribute($path)
    {

        // 如果不是 `http` 子串开头，那就是从后台上传的，需要补全 URL
        if ( ! starts_with($path, 'http')) {

            // 拼接完整的 URL
            $path = config('app.url') . "/uploads/images/avatars/$path";

        }

        $this->attributes['avatar'] = $path;

    }

}
