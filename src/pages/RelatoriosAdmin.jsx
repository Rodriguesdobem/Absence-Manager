import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SharedNav from '../common/SharedNav'

function RelatoriosAdmin() {
  const navigate = useNavigate()

  return (
    <div className="db-root">
      <SharedNav activeItem="relatorios" />
      
      <div className="main-content">
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="dashboard-title">Relatórios Administrativos</span>
          </div>
        </div>
        
        <div className="relatorios-container">
          <div className="relatorio-card">
            <h3>Relatório Geral de Frequência</h3>
            <p>Frequência de todos os alunos da instituição</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Relatório por Professor</h3>
            <p>Desempenho e estatísticas por professor</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Relatório por Turma</h3>
            <p>Análise detalhada por turma</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Alunos Críticos</h3>
            <p>Lista de alunos com frequência abaixo de 75%</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Relatório Mensal</h3>
            <p>Resumo completo do mês</p>
            <button className="btn-primary">Gerar Relatório</button>
          </div>
          <div className="relatorio-card">
            <h3>Exportar Dados</h3>
            <p>Exportar todos os dados em Excel/PDF</p>
            <button className="btn-primary">Exportar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelatoriosAdmin
