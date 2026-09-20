// Both views reuse one list, so a publication cannot drift between views.
var publicationList = document.getElementById('publication-list');

// Fit the first six papers (through GPSMirror), including wrapped text.
function sizePublicationList() {
  if (!publicationList) return;
  var entries = publicationList.querySelectorAll('.publication-entry:not([hidden])');
  var last = entries[Math.min(6, entries.length) - 1];
  if (!last) return;
  var height = Math.ceil(last.getBoundingClientRect().bottom - publicationList.getBoundingClientRect().top + publicationList.scrollTop);
  publicationList.style.setProperty('--publication-list-height', height + 'px');
}

document.querySelectorAll('[data-publication-filter]').forEach(function (button) {
  button.addEventListener('click', function () {
    var showAll = button.dataset.publicationFilter === 'all';
    document.querySelectorAll('.publication-entry').forEach(function (entry) {
      entry.hidden = !showAll && entry.dataset.selected !== 'true';
    });
    document.querySelectorAll('[data-publication-filter]').forEach(function (item) {
      item.setAttribute('aria-pressed', String(item === button));
    });
    if (publicationList) publicationList.scrollTop = 0;
    sizePublicationList();
  });
});

sizePublicationList();
window.addEventListener('resize', sizePublicationList);
if (document.fonts) document.fonts.ready.then(sizePublicationList);
if (publicationList && 'ResizeObserver' in window) {
  var publicationObserver = new ResizeObserver(sizePublicationList);
  publicationList.querySelectorAll('.publication-entry').forEach(function (entry) {
    publicationObserver.observe(entry);
  });
}
