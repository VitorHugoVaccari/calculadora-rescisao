function atualizarFormulario(vari) {
        const tipoSelecionado = vari.target.value;
        const elementos = Array.from(document.querySelectorAll(".condicional"));
        if (tipoSelecionado === "vazio") {
          elementos.forEach(function (elemento) {
            const tipo = elemento.getAttribute("data-type");
            if (tipo !== null) {
              const dataType = tipo.split(",");
              elemento.classList.remove("hidden");
            }
          });
        } else {
          elementos.forEach(function (elemento) {
            const tipo = elemento.getAttribute("data-type");
            if (tipo !== null) {
              const dataType = tipo.split(",");
              if (dataType.includes(tipoSelecionado) || tipo === "todos") {
                elemento.classList.remove("hidden");
              } else {
                elemento.classList.add("hidden");
              }
            }
          });
        }
      }

      let tipoRecisao = document.getElementById("tipoDeRecisao");

      tipoRecisao.addEventListener("change", atualizarFormulario);