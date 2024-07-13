<?php
/*
 * @software API for the Siga Student System | Fatec
 * @author Bruno Venancio Alves <boteistem@gmail.com>
 * @copyrigh (c) 2023 
 * @license  Open Software License v. 3.0 (OSL-3.0)
 */

namespace app\controller\historico;
use app\core\Controller;
use app\interfaces\ControllerInterface;
use app\classes\Input;
use app\controller\Session\Cookie;
use app\classes\HttpFactory;
use Symfony\Component\DomCrawler\Crawler;

Class historico extends Controller{

    public $uid = null;
    public $siga = null;
    protected $header = "Content-Type:text/html; charset=utf-8";
    protected $http_client = null;

    protected Crawler $crawler;

    public function index(){

    }

    public function __construct(){

        $this->uid = Input::get("uid");
        $this->crawler = new Crawler;
        parent::__construct();
    }

    public function get(){
                if ($this->status_cookie){

                    $XML_HTML = $this->getContent($this->cookie->getCookie());
                    
                    $this->crawler->addHtmlContent($XML_HTML);
                    $historico = $this->crawler->filter('input[name="Grid1ContainerDataV"]')->attr('value');           
                
                    $dados = $this->trataJson( json_decode($historico));
                    $this->response($dados);

                }else{

                    $this->response(array(
                            "error" => 400,
                            "msg" => "Crie uma sessão com um usuário válido"
                    )); 

                }

    }

    public function Post(){



    }
    

    private function getContent($cookie){

        $http_client= new HttpFactory(
            "GET",
            "https://siga.cps.sp.gov.br/aluno/historicocompleto.aspx",
            null,
            null,
            $cookie
        );
        $response= $http_client->request();
        return $response->getBody()->getContents();
    }

    private function trataJson($dados){
        $jsonTratado = array();
        
        foreach($dados as $historico){
            $jsonTratado[] = array(
                "ID" => $historico[1],
                "PERIODO" => $historico[2],
                "MEDIA" => $historico[4],
                "FREQUENCIA" => $historico[5],
                "STATUS" => $historico[7],
               
            );
        }


        return $jsonTratado;
    }

}