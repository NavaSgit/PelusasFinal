import React from 'react';

/**
 * Cuadro de notificación Rubber Hose vintage (años 30).
 * Rectángulo simple y limpio con bordes circulares, fondo pergamino y borde de tinta negra.
 */
export default function ParchmentBanner({
  bannerType = 'info',
  icon = null,
  message = '',
  testId = 'action-banner',
  messageTestId = 'banner-message',
  isBusting = false,
  extraAction = null,
}) {
  return (
    <div className="rubberhose-banner-container">
      <div
        className={`action-banner notification-banner-box banner-${bannerType} ${isBusting ? 'shake-bust' : ''}`}
        data-testid={testId}
      >
        <div className="banner-content">
          {icon}
          <span className="banner-text" data-testid={messageTestId}>
            {message}
          </span>
        </div>
        {extraAction}
      </div>
    </div>
  );
}
