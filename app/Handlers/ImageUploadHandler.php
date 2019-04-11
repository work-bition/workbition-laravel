<?php

namespace App\Handlers;



class ImageUploadHandler
{
  //判定文件后缀
  //设置路径
  //设置文件名
  //保存文件
  //压缩文件（如有需要）
  //返回参数

  // 只允许以下后缀名的图片文件上传
  protected $allowed_ext = ["png", "jpg", "gif", "jpeg"];

  public function save($file, $folder, $file_prefix)
  {

    // 获取文件的后缀名，因图片从剪贴板里黏贴时后缀名为空，所以此处确保后缀一直存在
    //这个函数是\\vendor\\symfony\\http-foundation\\File\\UploadedFile.php里面的函数
    $extension = strtolower($file->getClientOriginalExtension()) ?: 'png';

    // 如果上传的不是图片将终止操作
    if ( ! in_array($extension, $this->allowed_ext)) {

      return false;

    }

    // 构建存储的文件夹规则，值如：uploads/images/avatars/201709/21/
    // 文件夹切割能让查找效率更高。
    //PHP函数date("Ym/d", time())返回 "201904/11"
    $folder_name = "uploads/images/$folder/" . date("Ym/d", time());

    // 文件具体存储的物理路径，`public_path()` 获取的是 `public` 文件夹的物理路径。
    // 值如：/home/vagrant/Code/larabbs/public/uploads/images/avatars/201709/21/
    $upload_path = public_path() . '/' . $folder_name;

     // 拼接文件名，加前缀是为了增加辨析度，前缀可以是相关数据模型的 ID
     // 值如：1_1493521050_7BVc9v9ujP.png
     $filename = $file_prefix . '_' . time() . '_' . str_random(10) . '.' . $extension;

     // 将图片移动到我们的目标存储路径中
     $file->move($upload_path, $filename);

     return [

       'path' => config('app.url') . "/$folder_name/$filename"

     ];

  }

}
