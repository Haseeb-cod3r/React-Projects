import { useState } from "react";

function App() {
  const [isPopOpen, setIsPopOpen] = useState(false);

  function openPop() {
    setIsPopOpen(true);
  }

  function closePop() {
    setIsPopOpen(false);
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col gap-10 items-center p-10">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-400 rounded-full blur-[120px] opacity-30"></div>

      <p className="relative z-10 text-gray-200 max-w-3xl text-center leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
        repudiandae suscipit perferendis, dicta deserunt est dolores ut. Quia
        ducimus eius, provident totam sit alias! Officia quo, voluptas esse
        consequatur corporis iure tenetur, sunt eum voluptates in aperiam
        deserunt. Placeat atque eaque illo animi, ut in at sit natus sed? Ut
        deleniti unde tempora praesentium expedita, provident mollitia deserunt
        doloremque ducimus tenetur. Eius, voluptatem quos tempore explicabo
        minima exercitationem molestias? Dolor incidunt voluptas est tempore.
        Pariatur, architecto quos, molestiae possimus fuga quis at sit, adipisci
        officiis sunt voluptas. Beatae aut sapiente deleniti dolor! Voluptates
        nostrum minima ipsam delectus optio atque repellendus id repudiandae
        facilis dolor eligendi omnis, neque rerum ipsa, quia eveniet illo,
        blanditiis nam voluptatum ducimus totam incidunt. Explicabo enim modi,
        illum accusamus magni placeat repellat natus reiciendis ducimus cum
        possimus voluptatum perferendis rem tempore quidem? Cupiditate tenetur,
        quas fugiat dolorem odit sit praesentium ad consectetur nobis veritatis,
        ducimus voluptas soluta voluptatibus labore debitis totam autem
        blanditiis sed eum natus. Eveniet, cupiditate doloremque? Placeat natus,
        quo obcaecati delectus quis excepturi ratione, velit accusamus
        laboriosam vitae consequuntur autem nobis amet recusandae maiores.
        Necessitatibus numquam itaque at quae facere suscipit ea nihil, illum,
        minus illo vel odit aliquid! Eius magni sed dolorem corrupti commodi,
        expedita, dignissimos fugit non id tenetur error. Sed quaerat saepe
        obcaecati nostrum numquam tempora fuga officiis animi? Facilis esse
        repellendus error harum molestiae quos quasi placeat autem a id libero
        adipisci eveniet, dignissimos voluptatum sint fuga cum eligendi sapiente
        sed ut mollitia. Delectus quis fuga facere, eius odit sapiente sequi cum
        repudiandae ratione at minus nemo. Dignissimos est excepturi eos
        corrupti tempora modi nam provident harum delectus corporis, porro a
        error minus impedit, cum ex quibusdam obcaecati. Sapiente reiciendis eum
        expedita. Inventore ipsa soluta repudiandae tenetur, voluptas dicta
        itaque consectetur sed autem rerum magni quidem, necessitatibus atque
        molestiae eum hic modi porro ipsam id fugiat! Recusandae adipisci facere
        suscipit debitis quo, aut consequatur sapiente ratione nihil, laboriosam
        nobis reiciendis ut, consequuntur vitae porro delectus. Nulla voluptatem
        nisi laborum atque accusantium reprehenderit provident corporis
        perspiciatis ea distinctio quibusdam neque incidunt, adipisci sapiente
        maxime. Eius maxime, est dolore non fugit voluptatem voluptatibus
        inventore doloribus sapiente? Doloremque consequuntur, libero itaque
        adipisci, qui aperiam possimus ex cumque doloribus maxime fugit, error
        architecto! Nemo rerum dolores illo placeat id earum, dolorem natus
        asperiores consequatur labore distinctio laudantium magni? Omnis eos
        ratione architecto magni corporis. Odio, ratione! Earum libero totam,
        nesciunt possimus sunt dignissimos reiciendis tenetur ea quae quasi
        officiis nam mollitia, omnis sint id fugit harum. Tempora cupiditate
        minima recusandae nesciunt corporis nulla suscipit ad placeat nam maxime
        fugiat obcaecati quos, nostrum praesentium deserunt sunt earum officiis
        ullam adipisci, laborum ut voluptatibus dignissimos tenetur dolorum. Eos
        cum in facilis labore adipisci, et animi saepe ad voluptas ipsa quae
        officiis eaque hic quis quas illum! Tempore, voluptates distinctio quis
        incidunt, inventore nemo dolor perferendis magni dolorem, molestiae
        nulla doloribus cupiditate quam unde! Aperiam obcaecati repellendus
        reiciendis facilis rem. Ullam neque doloremque culpa voluptatum magnam
        sunt? Dignissimos quidem repudiandae neque temporibus vitae, ad eveniet
        explicabo. Magnam, porro provident recusandae aut dolore tenetur facere,
        quibusdam officia ex quo dignissimos aliquam voluptatum eligendi sunt!
        Quaerat sequi voluptate iure. Pariatur aperiam quas nam qui
        reprehenderit atque sapiente sed libero eum ex quam rem culpa, doloribus
        impedit provident ea eligendi consequuntur numquam magnam? Iure nemo
        deleniti praesentium, aliquam maiores voluptatum dicta incidunt iste
        aspernatur hic quo quod nostrum repudiandae minima. Vel magni ipsa
        voluptatum dolores praesentium voluptas nihil iste unde laboriosam quod
        possimus blanditiis, officia id, non dolor voluptate aut aliquam placeat
        necessitatibus, animi perspiciatis magnam nobis porro minus! Facere
        porro omnis aut quas ut itaque, atque repellat earum.
      </p>

      <button
        onClick={openPop}
        className="relative z-10 bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
      >
        open pop up
      </button>

      {isPopOpen && (
        <div
          onClick={closePop}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[320px] bg-white rounded-2xl p-6 text-center shadow-2xl animate-scaleIn"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              This is a Pop-up 🚀
            </h2>

            <p className="text-gray-600 mb-6">
              Click outside the modal to close it.
            </p>

            <button
              onClick={closePop}
              className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 rounded-xl text-white font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
