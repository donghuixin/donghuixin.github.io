// Both views reuse one list, so a publication cannot drift between views.
document.querySelectorAll('[data-publication-filter]').forEach(function (button) {
  button.addEventListener('click', function () {
    var showAll = button.dataset.publicationFilter === 'all';
    document.querySelectorAll('.publication-entry').forEach(function (entry) {
      entry.hidden = !showAll && entry.dataset.selected !== 'true';
    });
    document.querySelectorAll('[data-publication-filter]').forEach(function (item) {
      item.setAttribute('aria-pressed', String(item === button));
    });
  });
});
