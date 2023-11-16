import React, { useState } from 'react';
import { Link } from "react-router-dom"
import "../styles/Initial.css"
import LogoImg from '../images/mclivrinhu.png';
import BannerImg from '../images/asasas.png';
import Imagem2 from '../images/image2.png'
import Imagem1 from '../images/201560.png'
import Imagem3 from '../images/imagenoti3.png'
import Imagem4 from '../images/1827402.png'
import { NaoLogado } from "../components/IsLogged"
import { FiAlertOctagon } from "react-icons/fi";

const Initial = () => {


    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return ( 
        <section>
        <div className="circle"></div>
        <div className="content">
          <div className="text">
            <h2>Focus <br /><span>Task</span></h2>
            <p>FocusTask é uma aplicação que, com suas funcionalidades, será capaz de auxiliar estudantes a organizarem sua vida acadêmica com a vida pessoal de forma harmônica com suas incríveis funcionalidades </p>
            <p className='p1'><span><FiAlertOctagon/> Teste grátis <FiAlertOctagon/></span> Não é necessário cartão de crédito.</p>
            <button onClick={openModal}>Ver funcionalidades</button>
          </div>
        </div>
  
        <div className="boxImg">
          <img src={BannerImg} alt="" className="img1" />
        </div>
  
        {modalOpen && (
  <div className="__modal">
    <div className="__modal-content">
      <div className="__modal-header">
        <h3>Funcionalidades oferecidas pelo sistema:</h3>
      </div>
      <div className="__slash-1"></div>
      <div className="__modal-body">
        <div className="__card">
          <div className="__header">
            <div className="__image">
              <img src={Imagem1} alt="" />
            </div>
          </div>
          <div className="__info">
            <p className="__description">Crie áreas de trabalho personalizadas para cada disciplina, projeto ou tarefa. Mantenha seus materiais e tarefas organizados em um espaço dedicado a cada contexto acadêmico.</p>
          </div>
        </div>

        <div className="__card">
          <div className="__header">
            <div className="__image">
              <img src={Imagem2} alt="" />
            </div>
          </div>
          <div className="__info">
            <p className="__description">Faça anotações diretamente no sistema. Registre ideias, insights, lembretes e informações importantes relacionadas a projetos e disciplinas específicas. Tenha tudo em um só lugar para fácil acesso.</p>
          </div>
        </div>

        <div className="__card">
          <div className="__header">
            <div className="__image">
              <img src={Imagem3} alt="" />
            </div>
          </div>
          <div className="__info">
            <p className="__description">Receba notificações em tempo real sobre atividades relevantes nos seus quadros. Seja informado sobre comentários, atualizações e prazos. Fique sempre atualizado e não perca nenhum detalhe importante.</p>
          </div>
        </div>

        <div className="__card">
          <div className="__header">
            <div className="__image">
              <img src={Imagem4} alt="" />
            </div>
          </div>
          <div className="__info">
            <p className="__description">Acesse gadgets úteis, como timers e calculadoras, diretamente no sistema. Otimize seu tempo de estudo, faça cálculos rápidos e tenha ferramentas convenientes ao seu alcance.</p>
          </div>
        </div>
      </div>
      <div className="__slash-1"></div>
      <button className='__btnfechar' onClick={closeModal}>Fechar</button>
    </div>
  </div>
)}

      </section>
    )
}

export default Initial