// Splide Carousel

new Splide("#splide-slides", {
  autoplay: true,
  interval: 2000,
  type: "loop",
}).mount();

// SweetAlert2

function deleteTodo(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed)
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    console.log("Todo deleted");
  });
}
