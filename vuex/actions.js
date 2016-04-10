export const updateActiveMarker = function ({ dispatch }, name) {
  dispatch('UPDATE_ACTIVE_MARKER', name);
}

export const togglePanelSize = function({ dispatch }) {
  dispatch('TOGGLE_PANEL_SIZE');
}
