<?php

class Response{
    const JSON = "json";
    /**
    * 按综合方式去封装通信的方法
    * @param integer $code 状态码
    * @param string $message 消息提示
    * @param array $data 数据
    * @param string $type 数据类型
    * return string
    */
    //public static function show($code, $message = '',$data = array(), $type){
    public static function show($code, $message = '',$data = array(), $type = self::JSON){
        if (!is_numeric($code)) {
            return '';
        }
        //变量存在就是format的值，不存在就是默认json
        $type = isset($_GET['format']) ? $_GET['format'] : self::JSON ;

        $result = array(
            'code'=>$code,
            'message'=>$message,
            'data'=>$data,
        );

        if ($type == 'json') {
            //echo $callback;
            self::json($code, $message, $data);
            exit;
        } elseif ($type == 'array') {
            echo "<pre>";
            var_dump($result);
            //调试模式
        }elseif ($type == 'xml') {
            self::xmlEncode($code, $message, $data);
            exit;
        }else{
            //something
        }

    }
    /**
    * 按json方式去封装通信的方法
    * @param integer $code 状态码
    * @param string $message 消息提示
    * @param array $data 数据
    * return string
    */
    public static function json($code, $message = '', $data = array()){
        if (!is_numeric($code) || !is_array($data)) {
            return '';
        }
        //设置callback
        $callback = isset($_GET['callback']) ? $_GET['callback'] : 'callback'; 

        $result = array(
            'code' => $code,
            'message' => $message,
            'data' => $data
        );
        echo $callback.'('.json_encode($result).')';
        exit;
    }

/*    public static function xml(){
        header("Content-Type:text/xml"); 
        $xml = "<?xml version='1.0' encoding='UTF-8'?>\n";
        $xml .= "<root>\n";
        $xml .= "<code>200</code>\n";
        $xml .= "<message>返回数据成功!</message>\n";
        $xml .= "<data>\n";
        $xml .= "<id>1</id>\n";
        $xml .= "<name>highsea</name>\n";
        $xml .= "</data>\n";
        $xml .= "</root>\n";

        echo $xml;
    }*/

    /**
    * 按xml方式去封装通信的方法
    * @param integer $code 状态码
    * @param string $message 消息提示
    * @param array $data 数据
    * return string
    */
    public static function xmlEncode($code, $message, $data = array()){
        if (!is_numeric($code)) {
            return '';
        }
        $result = array(
            'code' => $code,
            'message' => $message,
            'data' => $data,
        );
        header("Content-Type:text/xml");
        $xml = "<?xml version='1.0' encoding='UTF-8'?>\n";
        $xml .="<root>\n";
        //$xml .= self::xmlToEncode($data);
        $xml .= self::xmlToEncode($result);
        $xml .="</root>\n";
        echo $xml;
    }

    public static function xmlToEncode($data){
        $xml = $attr = "";
        foreach ($data as $key => $value) {
            if (is_numeric($key)) {
                //xml节点不能为数字
                $attr = " id='{$key}'";
                //注意单引号 双引号
                $key = "item";
            }
            //$xml .="<{$key}>\n";
            $xml .= "<{$key}{$attr}>\n";
            //$xml .=$value;
            $xml .= is_array($value) ? self::xmlToEncode($value) : $value;
            //递归，直到不是数组为止

            $xml .="</{$key}>\n";
        }
        return $xml;
    }
}
/*Response::xml();*/


?>