import { useContext } from "react";
import { ComponentContext } from "../contexts/ComponentContext";
import exampleProductImage from "../assets/images/example-product-image.png";
import eletricIcon from "../assets/icons/eletric-icon.svg";
import sensorIcon from "../assets/icons/sensor-icon.svg";
import receptorIcon from "../assets/icons/receptor-icon.svg";
import energyIcon from "../assets/icons/bolt.svg";

export function ComponentView() {
  const { currentComponent } = useContext(ComponentContext);
  return (
    <main className="h-full w-full rounded border border-[#D8DFE6]">
      {
        currentComponent ?
          <div className="flex flex-col">
            <h1 className="flex items-center gap-2 py-3 px-4 font-semibold text-[18px] border-b">
              {currentComponent.name}
              {
                currentComponent.sensorType === "energy" &&
                <img src={energyIcon} alt="Ícone de Energia" />
              }
            </h1>

            <div className="flex flex-col px-6 w-full max-w-3xl">
              <div className="flex p-6">
                <img src={exampleProductImage} alt={currentComponent.name} />

                <div className="w-full flex flex-col p-6">
                  <div className="flex flex-col gap-2 border-b pb-6">
                    <span className="font-semibold">Título do equipamento</span>
                    <h2>Moto Elétrico (Trifásico)</h2>
                  </div>

                  <div className="flex flex-col gap-2 pt-6">
                    <span className="font-semibold">Responsáveis</span>
                    <span className="flex items-center gap-2">
                      <img src={eletricIcon} alt="Ícone de Elétrica" />
                      Elétrica
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full border-b bg-zinc-300" />

              <div className="flex p-6">
                <div className="w-full flex flex-col gap-2">
                  <span className="font-semibold">Sensor</span>
                  {
                    currentComponent.sensorId ?
                      <span className="flex items-center gap-2 text-zinc-500">
                        <img src={sensorIcon} alt="Ícone de Sensor" />
                        {currentComponent.sensorId}
                      </span>
                      :
                      <span className="text-zinc-500">Não possui</span>
                  }
                </div>

                <div className="w-full flex flex-col gap-2">
                  <span className="font-semibold">Receptor</span>
                  <span className="flex items-center gap-2 text-zinc-500">
                    <img src={receptorIcon} alt="Ícone de Sensor" />
                    EUH4R27
                  </span>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="w-full h-full flex flex-col justify-center items-center p-6">
            <span>Por favor, selecione um componente</span>
            <span className="text-red-500">*Obs do Dev: Pelo Figma, eu entendi que só componentes podem ser selecionados.</span>
          </div>
      }
    </main>
  )
}
