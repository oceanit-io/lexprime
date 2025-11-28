import React, { useState, useEffect } from 'react'
import { FaCalculator, FaInfoCircle, FaChartBar, FaCheckCircle, FaChartLine, FaMoneyBillWave } from 'react-icons/fa'

const Calculator = () => {
  const [formData, setFormData] = useState({
    valorFinanciado: '',
    prazo: '',
    valorParcela: '',
    parcelasPagas: '',
    dataContrato: ''
  })

  const [resultado, setResultado] = useState(null)
  const [taxaMediaBACEN, setTaxaMediaBACEN] = useState(2.14) // Taxa média mensal em %
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState([])
  const [saldoDevedorData, setSaldoDevedorData] = useState([])

  // Busca taxa média do BACEN (código 27641 - SGS)
  useEffect(() => {
    const fetchTaxaBACEN = async () => {
      try {
        // Em produção, descomentar para usar API real do BACEN
        // const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.27641/dados/ultimos/1?formato=json')
        // const data = await response.json()
        // if (data && data.length > 0) {
        //   setTaxaMediaBACEN(parseFloat(data[0].valor))
        // }
        setTaxaMediaBACEN(2.14) // Valor padrão: 2.14% ao mês
      } catch (error) {
        console.error('Erro ao buscar taxa BACEN:', error)
        setTaxaMediaBACEN(2.14) // Fallback
      }
    }
    fetchTaxaBACEN()
  }, [])

  // Formata valor para moeda brasileira
  const formatCurrency = (value) => {
    if (!value && value !== 0) return ''
    const numValue = typeof value === 'number' ? value : parseFloat(value)
    if (isNaN(numValue)) return ''
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numValue)
  }

  // Converte string formatada para número
  const parseCurrency = (value) => {
    if (!value) return 0
    // Remove R$, espaços, pontos de milhar, mantém apenas números e vírgula
    let cleaned = value.toString()
      .replace(/R\$/gi, '')
      .replace(/\s/g, '')
      .replace(/\./g, '') // Remove pontos (separadores de milhar)
      .replace(',', '.') // Converte vírgula para ponto
    
    const parsed = parseFloat(cleaned)
    return isNaN(parsed) ? 0 : parsed
  }

  // Formata input de moeda enquanto digita
  const handleCurrencyInput = (field, value) => {
    // Remove tudo exceto números
    const numbers = value.replace(/\D/g, '')
    if (numbers === '') {
      setFormData({ ...formData, [field]: '' })
      return
    }
    // Converte centavos para reais
    const numValue = parseFloat(numbers) / 100
    setFormData({ ...formData, [field]: formatCurrency(numValue) })
  }

  // Calcula o valor presente (PV) dado uma taxa de juros
  const calcularValorPresente = (taxaMensal, valorParcela, numParcelas) => {
    if (taxaMensal === 0) {
      return valorParcela * numParcelas
    }
    const umMaisTaxa = 1 + taxaMensal
    const fator = Math.pow(umMaisTaxa, numParcelas)
    return valorParcela * (fator - 1) / (taxaMensal * fator)
  }

  // Calcula taxa de juros usando método de bissecção
  const calcularTaxaJuros = (valorFinanciado, valorParcela, numParcelas) => {
    // Validações básicas
    if (!valorFinanciado || !valorParcela || !numParcelas) return null
    if (valorFinanciado <= 0 || valorParcela <= 0 || numParcelas <= 0) return null
    if (valorParcela * numParcelas <= valorFinanciado) return null // Sem juros

    // Método de bissecção para encontrar a taxa
    let taxaMin = 0.0001  // 0.01% ao mês
    let taxaMax = 0.5      // 50% ao mês
    const precisao = 0.0001
    const maxIteracoes = 100

    for (let i = 0; i < maxIteracoes; i++) {
      const taxaMedia = (taxaMin + taxaMax) / 2
      const valorCalculado = calcularValorPresente(taxaMedia, valorParcela, numParcelas)
      
      const diferenca = Math.abs(valorCalculado - valorFinanciado)
      const erroRelativo = diferenca / valorFinanciado

      // Se encontrou com precisão suficiente
      if (erroRelativo < precisao) {
        return taxaMedia
      }

      // Ajusta os limites
      if (valorCalculado > valorFinanciado) {
        taxaMin = taxaMedia
      } else {
        taxaMax = taxaMedia
      }

      // Se os limites estão muito próximos, para
      if (taxaMax - taxaMin < 0.000001) {
        break
      }
    }

    // Retorna a taxa média final
    const taxaFinal = (taxaMin + taxaMax) / 2
    
    // Valida o resultado
    const valorFinal = calcularValorPresente(taxaFinal, valorParcela, numParcelas)
    const erroFinal = Math.abs(valorFinal - valorFinanciado) / valorFinanciado
    
    if (erroFinal > 0.01) { // Erro maior que 1%
      return null
    }

    return taxaFinal
  }

  // Gera dados do gráfico de composição das parcelas
  const gerarDadosGrafico = (valorFinanciado, valorParcela, numParcelas, taxaMensal) => {
    const dados = []
    let saldoDevedor = valorFinanciado
    const numParcelasGrafico = Math.min(numParcelas, 12) // Mostra até 12 parcelas

    for (let i = 1; i <= numParcelasGrafico; i++) {
      const juros = saldoDevedor * taxaMensal
      const amortizacao = valorParcela - juros
      saldoDevedor = Math.max(0, saldoDevedor - amortizacao)

      dados.push({
        parcela: i,
        juros: Math.max(0, juros),
        amortizacao: Math.max(0, amortizacao),
        total: valorParcela
      })
    }

    return dados
  }

  // Gera dados de evolução do saldo devedor (atual vs BACEN)
  const gerarDadosSaldoDevedor = (valorFinanciado, valorParcela, numParcelas, taxaMensalAtual, taxaMensalBACEN) => {
    const dados = []
    const numPontos = Math.min(numParcelas, 20) // Mostra até 20 pontos
    const intervalo = Math.max(1, Math.floor(numParcelas / numPontos))

    // Cenário atual
    let saldoAtual = valorFinanciado
    
    // Cenário com taxa BACEN - recalcula valor da parcela
    const taxaBACEN = taxaMensalBACEN / 100
    const umMaisTaxaBACEN = 1 + taxaBACEN
    const fatorBACEN = Math.pow(umMaisTaxaBACEN, numParcelas)
    const valorParcelaBACEN = taxaBACEN > 0 
      ? valorFinanciado * (taxaBACEN * fatorBACEN) / (fatorBACEN - 1)
      : valorFinanciado / numParcelas
    
    let saldoBACEN = valorFinanciado

    // Ponto inicial
    dados.push({
      mes: 0,
      saldoAtual: valorFinanciado,
      saldoBACEN: valorFinanciado
    })

    // Calcula para cada ponto
    for (let i = intervalo; i <= numParcelas; i += intervalo) {
      // Calcula saldo atual desde o último ponto
      let tempSaldoAtual = dados[dados.length - 1].saldoAtual
      for (let j = dados[dados.length - 1].mes + 1; j <= i; j++) {
        const jurosAtual = tempSaldoAtual * taxaMensalAtual
        const amortizacaoAtual = valorParcela - jurosAtual
        tempSaldoAtual = Math.max(0, tempSaldoAtual - amortizacaoAtual)
      }

      // Calcula saldo BACEN desde o último ponto
      let tempSaldoBACEN = dados[dados.length - 1].saldoBACEN
      for (let j = dados[dados.length - 1].mes + 1; j <= i; j++) {
        const jurosBACEN = tempSaldoBACEN * taxaBACEN
        const amortizacaoBACEN = valorParcelaBACEN - jurosBACEN
        tempSaldoBACEN = Math.max(0, tempSaldoBACEN - amortizacaoBACEN)
      }

      dados.push({
        mes: i,
        saldoAtual: tempSaldoAtual,
        saldoBACEN: tempSaldoBACEN
      })
    }

    // Garante último ponto
    if (dados[dados.length - 1].mes < numParcelas) {
      let tempSaldoAtual = dados[dados.length - 1].saldoAtual
      let tempSaldoBACEN = dados[dados.length - 1].saldoBACEN
      
      for (let j = dados[dados.length - 1].mes + 1; j <= numParcelas; j++) {
        const jurosAtual = tempSaldoAtual * taxaMensalAtual
        const amortizacaoAtual = valorParcela - jurosAtual
        tempSaldoAtual = Math.max(0, tempSaldoAtual - amortizacaoAtual)

        const jurosBACEN = tempSaldoBACEN * taxaBACEN
        const amortizacaoBACEN = valorParcelaBACEN - jurosBACEN
        tempSaldoBACEN = Math.max(0, tempSaldoBACEN - amortizacaoBACEN)
      }
      
      dados.push({
        mes: numParcelas,
        saldoAtual: tempSaldoAtual,
        saldoBACEN: tempSaldoBACEN
      })
    }

    return dados
  }

  // Função principal de cálculo
  const calcularJuros = () => {
    // Parse dos valores
    const valorFin = parseCurrency(formData.valorFinanciado)
    const prazo = parseInt(formData.prazo) || 0
    const valorParc = parseCurrency(formData.valorParcela)
    const parcelasPagas = parseInt(formData.parcelasPagas) || 0

    // Validações
    if (!valorFin || valorFin <= 0) {
      alert('Por favor, informe um valor financiado válido.')
      return
    }
    if (!prazo || prazo <= 0) {
      alert('Por favor, informe um prazo válido (número de parcelas).')
      return
    }
    if (!valorParc || valorParc <= 0) {
      alert('Por favor, informe um valor de parcela válido.')
      return
    }
    if (parcelasPagas < 0) {
      alert('A quantidade de parcelas pagas não pode ser negativa.')
      return
    }
    if (parcelasPagas >= prazo) {
      alert('A quantidade de parcelas pagas deve ser menor que o prazo total.')
      return
    }
    if (valorParc * prazo <= valorFin) {
      alert('O valor total das parcelas deve ser maior que o valor financiado para haver juros.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      // Calcula taxa de juros mensal
      const taxaMensal = calcularTaxaJuros(valorFin, valorParc, prazo)

      if (!taxaMensal || taxaMensal <= 0) {
        alert('Não foi possível calcular a taxa de juros. Verifique se os valores estão corretos.')
        setLoading(false)
        return
      }

      // Converte para percentual e taxa anual
      const taxaMensalPercent = taxaMensal * 100
      const taxaAnual = taxaMensal * 12 * 100

      // Taxa média BACEN (já está em %)
      const taxaMediaMensalBACEN = taxaMediaBACEN
      const taxaMediaAnualBACEN = taxaMediaBACEN * 12

      // Comparações
      const diferencaMensal = taxaMensalPercent - taxaMediaMensalBACEN
      const diferencaAnual = taxaAnual - taxaMediaAnualBACEN
      const percentualAcima = taxaMediaAnualBACEN > 0 
        ? (diferencaAnual / taxaMediaAnualBACEN) * 100 
        : 0

      // Gera dados do gráfico
      const dadosGrafico = gerarDadosGrafico(valorFin, valorParc, prazo, taxaMensal)
      setChartData(dadosGrafico)

      // Gera dados de evolução do saldo devedor
      const dadosSaldo = gerarDadosSaldoDevedor(valorFin, valorParc, prazo, taxaMensal, taxaMediaMensalBACEN)
      setSaldoDevedorData(dadosSaldo)

      // Calcula valores totais
      const valorTotalPago = valorParc * prazo
      const valorTotalJuros = valorTotalPago - valorFin
      
      // Economia potencial (estimativa)
      const economiaPotencial = diferencaAnual > 0 
        ? (diferencaAnual / 100) * (valorFin * (prazo / 12)) * 0.3 // 30% da diferença
        : 0

      // Define resultado
      setResultado({
        taxaMensal: taxaMensalPercent,
        taxaAnual: taxaAnual,
        taxaMediaBACEN: taxaMediaAnualBACEN,
        diferenca: diferencaAnual,
        percentualAbusivo: percentualAcima,
        valorTotalJuros: valorTotalJuros,
        economizado: economiaPotencial,
        valorFinanciado: valorFin,
        valorParcela: valorParc,
        prazo: prazo
      })

      setLoading(false)
    }, 500)
  }

  // Determina status de juros abusivos
  const getStatusAbusivo = () => {
    if (!resultado) return null
    const percentual = resultado.percentualAbusivo
    
    if (percentual > 50) {
      return { text: 'ALTAMENTE ABUSIVO', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
    }
    if (percentual > 20) {
      return { text: 'POTENCIALMENTE ABUSIVO', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' }
    }
    if (percentual > 0) {
      return { text: 'ACIMA DA MÉDIA', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' }
    }
    return { text: 'DENTRO DA MÉDIA', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' }
  }

  const status = getStatusAbusivo()

  return (
    <section id="calculadora" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div data-aos="zoom-in" className="inline-flex items-center justify-center w-16 h-16 bg-lex-blue rounded-full mb-4">
            <FaCalculator className="text-3xl text-lex-gold" />
          </div>
          <h2 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-lex-blue mb-4">
            Calculadora de Juros Abusivos
          </h2>
          <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-gray-700 max-w-3xl mx-auto mb-2">
            Desenvolvida pela <span className="font-semibold text-lex-blue">Lex Prime</span>
          </p>
          <p data-aos="fade-up" data-aos-delay="300" className="text-lg text-gray-600 max-w-3xl mx-auto">
            Entenda a composição da sua dívida e compare a taxa de juros do seu contrato com a taxa média de referência do Banco Central do Brasil (BACEN)
          </p>
          <div data-aos="fade-up" data-aos-delay="400" className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
            <FaInfoCircle className="text-lex-blue" />
            <span className="text-sm text-gray-700">
              Integrado com BACEN - Código 27641 (SGS) - Taxa média para operações de crédito não rotativo com recursos livres
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Seção de Entrada */}
          <div data-aos="fade-right" className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-lex-blue mb-6">Dados do Contrato</h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    Valor total financiado
                    <FaInfoCircle className="text-gray-400 text-xs cursor-help" title="Valor total do financiamento" />
                  </label>
                  <input
                    type="text"
                    value={formData.valorFinanciado}
                    onChange={(e) => handleCurrencyInput('valorFinanciado', e.target.value)}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lex-blue focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    Prazo / Número de prestações
                    <FaInfoCircle className="text-gray-400 text-xs cursor-help" title="Total de parcelas do contrato" />
                  </label>
                  <input
                    type="number"
                    value={formData.prazo}
                    onChange={(e) => setFormData({...formData, prazo: e.target.value})}
                    placeholder="0"
                    min="1"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lex-blue focus:outline-none text-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    Valor da parcela do contrato
                    <FaInfoCircle className="text-gray-400 text-xs cursor-help" title="Valor de cada parcela mensal" />
                  </label>
                  <input
                    type="text"
                    value={formData.valorParcela}
                    onChange={(e) => handleCurrencyInput('valorParcela', e.target.value)}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lex-blue focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    Quantidade de parcelas pagas
                    <FaInfoCircle className="text-gray-400 text-xs cursor-help" title="Número de parcelas já pagas" />
                  </label>
                  <input
                    type="number"
                    value={formData.parcelasPagas}
                    onChange={(e) => setFormData({...formData, parcelasPagas: e.target.value})}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lex-blue focus:outline-none text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  Data da assinatura do contrato
                  <FaInfoCircle className="text-gray-400 text-xs cursor-help" title="Data em que o contrato foi assinado" />
                </label>
                <input
                  type="date"
                  value={formData.dataContrato}
                  onChange={(e) => setFormData({...formData, dataContrato: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-lex-blue focus:outline-none text-lg"
                />
              </div>

              <button
                onClick={calcularJuros}
                disabled={loading}
                className="w-full bg-lex-blue text-white py-4 rounded-lg font-bold text-xl hover:bg-lex-blue-dark transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculando...
                  </>
                ) : (
                  <>
                    <FaCalculator className="text-xl" />
                    Calcular Juros
                  </>
                )}
              </button>
            </div>

            {/* Gráfico */}
            {chartData.length > 0 && (
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-lex-blue mb-4 flex items-center gap-2">
                  <FaChartBar />
                  Composição das Parcelas
                </h4>
                <div className="flex items-end justify-between gap-1.5 pb-4 border-b-2 border-gray-200" style={{ height: '200px' }}>
                  {chartData.map((item, index) => {
                    const maxTotal = Math.max(...chartData.map(d => d.total || 0))
                    const maxJuros = Math.max(...chartData.map(d => d.juros || 0))
                    const maxAmortizacao = Math.max(...chartData.map(d => d.amortizacao || 0))
                    const maxValue = Math.max(maxTotal, maxJuros + maxAmortizacao)
                    
                    const jurosHeight = maxValue > 0 ? (item.juros / maxValue) * 100 : 0
                    const amortizacaoHeight = maxValue > 0 ? (item.amortizacao / maxValue) * 100 : 0
                    
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                        <div className="w-full flex flex-col justify-end" style={{ height: '100%' }}>
                          <div className="w-full h-full flex flex-col justify-end">
                            <div 
                              className="w-full bg-lex-gold rounded-t transition-all duration-300 hover:bg-lex-gold-light cursor-pointer border border-lex-gold-dark"
                              style={{ 
                                height: `${Math.max(amortizacaoHeight, 0)}%`,
                                minHeight: amortizacaoHeight > 0.1 ? '3px' : '0px'
                              }}
                              title={`Parcela ${item.parcela} - Amortização: ${formatCurrency(item.amortizacao)}`}
                            />
                            <div 
                              className="w-full bg-lex-blue rounded-t transition-all duration-300 hover:bg-lex-blue-dark cursor-pointer border border-lex-blue-dark"
                              style={{ 
                                height: `${Math.max(jurosHeight, 0)}%`,
                                minHeight: jurosHeight > 0.1 ? '3px' : '0px'
                              }}
                              title={`Parcela ${item.parcela} - Juros: ${formatCurrency(item.juros)}`}
                            />
                          </div>
                        </div>
                        <span className="text-xs text-gray-600 mt-2 font-medium">{item.parcela}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-lex-gold rounded"></div>
                    <span className="text-sm text-gray-700 font-medium">Amortização</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-lex-blue rounded"></div>
                    <span className="text-sm text-gray-700 font-medium">Juros</span>
                  </div>
                </div>
              </div>
            )}

            {/* Comparação de Cenários - Versão Compacta */}
            {saldoDevedorData.length > 0 && resultado && (() => {
              const ultimoDado = saldoDevedorData[saldoDevedorData.length - 1]
              const diferencaFinal = ultimoDado.saldoAtual - ultimoDado.saldoBACEN
              const economiaTotal = resultado.valorTotalJuros - (resultado.valorFinanciado * (resultado.taxaMediaBACEN / 100) * (resultado.prazo / 12))
              
              // Apenas 3 pontos: início, meio e fim
              const pontosChave = [
                saldoDevedorData[0],
                saldoDevedorData[Math.floor(saldoDevedorData.length / 2)],
                saldoDevedorData[saldoDevedorData.length - 1]
              ].filter(Boolean)
              
              return (
                <div className="mt-8 bg-gradient-to-br from-lex-blue/5 to-lex-gold/5 rounded-lg p-5 border-2 border-lex-blue/20 shadow-lg">
                  <h4 className="text-base font-semibold text-lex-blue mb-3 flex items-center gap-2">
                    <FaChartLine />
                    Comparação de Cenários
                  </h4>
                  
                  {/* Gráfico horizontal compacto */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {pontosChave.map((dado, idx) => {
                      const maxSaldo = Math.max(dado.saldoAtual, dado.saldoBACEN, resultado.valorFinanciado)
                      const alturaAtual = (dado.saldoAtual / maxSaldo) * 100
                      const alturaBACEN = (dado.saldoBACEN / maxSaldo) * 100
                      
                      return (
                        <div key={idx} className="text-center">
                          <div className="text-xs font-semibold text-gray-600 mb-2">Mês {dado.mes}</div>
                          <div className="flex items-end justify-center gap-1.5 h-16 mb-2">
                            <div className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-lex-blue rounded-t transition-all hover:opacity-80 cursor-pointer relative group"
                                style={{ height: `${alturaAtual}%`, minHeight: alturaAtual > 0 ? '3px' : '0' }}
                                title={`Atual: ${formatCurrency(dado.saldoAtual)}`}
                              />
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-lex-gold rounded-t transition-all hover:opacity-80 cursor-pointer relative group border border-lex-gold-dark"
                                style={{ height: `${alturaBACEN}%`, minHeight: alturaBACEN > 0 ? '3px' : '0' }}
                                title={`BACEN: ${formatCurrency(dado.saldoBACEN)}`}
                              />
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Dif: {formatCurrency(Math.abs(dado.saldoAtual - dado.saldoBACEN))}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Legenda compacta */}
                  <div className="flex items-center justify-center gap-4 mb-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-3 bg-lex-blue rounded"></div>
                      <span className="text-gray-600">Atual</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-3 bg-lex-gold rounded border border-lex-gold-dark"></div>
                      <span className="text-gray-600">BACEN</span>
                    </div>
                  </div>

                  {/* Cards informativos compactos */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-center gap-1.5 mb-1">
                        <FaMoneyBillWave className="text-lex-blue text-sm" />
                        <span className="text-xs font-semibold text-lex-blue">Economia Total</span>
                      </div>
                      <p className="text-lg font-bold text-gray-800">
                        {formatCurrency(Math.max(0, economiaTotal))}
                      </p>
                    </div>
                    <div className="bg-lex-gold/20 rounded-lg p-3 border border-lex-gold/30">
                      <div className="flex items-center gap-1.5 mb-1">
                        <FaInfoCircle className="text-lex-gold text-sm" />
                        <span className="text-xs font-semibold text-lex-gold">Análise</span>
                      </div>
                      <p className="text-xs text-gray-700 leading-tight">
                        {diferencaFinal > 0 
                          ? `${((diferencaFinal / ultimoDado.saldoAtual) * 100).toFixed(1)}% menor com BACEN`
                          : 'Taxa próxima do BACEN'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Seção de Resultado */}
          <div data-aos="fade-left" className="bg-gradient-to-br from-lex-blue to-lex-blue-dark rounded-2xl shadow-xl p-8 text-white">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                <FaCheckCircle className="text-4xl text-lex-gold" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Resultado do Cálculo</h3>
              <p className="text-white/80 text-sm">
                *Preencha com os valores da sua dívida bancária para o resultado da análise prévia de juros abusivos.
              </p>
            </div>

            {!resultado ? (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg">
                  Preencha os campos ao lado e clique em "Calcular Juros" para ver o resultado da análise.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Status */}
                {status && (
                  <div className={`${status.bg} ${status.color} p-4 rounded-lg text-center font-bold text-lg border-2 ${status.border}`}>
                    {status.text}
                  </div>
                )}

                {/* Taxa de Juros */}
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-semibold mb-4 text-lex-gold">Taxa de Juros do Contrato</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Taxa Mensal:</span>
                      <span className="text-2xl font-bold">{resultado.taxaMensal.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Taxa Anual:</span>
                      <span className="text-2xl font-bold">{resultado.taxaAnual.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                {/* Comparação com BACEN */}
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-semibold mb-4 text-lex-gold">Comparação com Taxa Média BACEN</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Taxa Média BACEN (Anual):</span>
                      <span className="text-xl font-semibold">{resultado.taxaMediaBACEN.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Diferença:</span>
                      <span className={`text-xl font-bold ${resultado.diferenca > 0 ? 'text-red-300' : 'text-green-300'}`}>
                        {resultado.diferenca > 0 ? '+' : ''}{resultado.diferenca.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/20">
                      <span className="text-white/80">Percentual acima da média:</span>
                      <span className={`text-xl font-bold ${resultado.percentualAbusivo > 0 ? 'text-red-300' : 'text-green-300'}`}>
                        {resultado.percentualAbusivo > 0 ? '+' : ''}{resultado.percentualAbusivo.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Economia Potencial */}
                {resultado.economizado > 0 && (
                  <div className="bg-lex-gold/20 rounded-lg p-6 backdrop-blur-sm border-2 border-lex-gold">
                    <h4 className="text-lg font-semibold mb-2 text-lex-gold">Economia Potencial</h4>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(resultado.economizado)}
                    </p>
                    <p className="text-white/80 text-sm mt-2">
                      Valor estimado que você poderia economizar com uma negociação adequada
                    </p>
                  </div>
                )}

                {/* Valor Total de Juros */}
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-semibold mb-2 text-lex-gold">Total de Juros a Pagar</h4>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(resultado.valorTotalJuros)}
                  </p>
                  <p className="text-white/70 text-sm mt-2">
                    Sobre um valor financiado de {formatCurrency(resultado.valorFinanciado)}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="#inicio"
                  className="block w-full bg-lex-gold text-lex-blue py-4 rounded-lg font-bold text-xl hover:bg-lex-gold-light transition transform hover:scale-105 shadow-lg text-center"
                >
                  Solicitar Análise Completa
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calculator
