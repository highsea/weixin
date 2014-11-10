<?php

//操作文件 缓存
class File{
    private $_dir;

    const EXT = '.json';

    public function __construct(){
        $this->_dir = dirname(__FILE__) . '../../cache/';
    }

    public function cacheData($key, $value = '', $path = ''){
        $filename = $this->_dir .$path .$key .self::EXT;

        if ($value !=='') {//将value值写入缓存
            if (is_null($value)) {
                return @unlink($filename);
            }
            $dir = dirname($filename);
            if (!is_dir($dir)) {
                mkdir($dir, 0777);
            }//如果不存在 创建 目录 

            return file_put_contents($filename, json_encode($value));
            //生成缓存
        }

        if (!is_file($filename)) {//判断文件是否存在
            return FALSE;
        }else{
            return json_decode(file_get_contents($filename), true);
        }
    }
}

?>