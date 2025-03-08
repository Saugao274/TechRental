// import { Button } from 'antd'

// import { ButtonPropsInterface } from '.'

// export const ButtonCommonStyle=
//     display: flex !important;
//     justify-content: center;
//     align-items: center;

//     padding: 8px 10px;
//     gap: 8px;
//     color: ${(props) =>
//         props?.$color || props?.theme?.colors?.primary} !important;
//     background: ${(props) =>
//         props.$backgroundColor || 'transparent'} !important;
//     border-radius: ${(props) => props?.$borderRadius || '8px'} !important;
//     border-color: ${(props) =>
//         props.$borderColor || props?.theme?.colors?.primary} !important;
//     font-size: ${(props) => props.$fontSize || props.theme.fontSize} !important;
//     font-weight: ${(props) =>
//         props.$fontWeight || props.theme.fontWeight.semiBold} !important;
//     line-height: auto;
//     transition: all 0.3s !important;
//     height: auto !important;
//     max-height: 48px;
//     width: ${(props) => props?.$width || 'fit-content'};
//     ${(props) => props?.$isCancel && css``}
//     span {
//         pointer-events: none !important;
//     }
//     &:not(:disabled):hover {
//         border-color: ${({ theme }) => theme?.colors?.primaryDark};
//         box-shadow: 0 0 2px 0 ${({ theme }) => theme?.colors?.primaryLighter};
//         color: ${(props) => props?.color || props?.theme?.colors?.primary};
//     }

//     &:active,
//     &.active {
//         border-color: ${({ theme }) => theme?.colors?.primaryDark};
//     }

//     &:disabled {
//         color: ${(props) => props?.theme?.colors?.primaryLighter} !important;
//     }

//     ${(props) =>
//         props.$padding &&
//         css`
//             padding: ${props.$padding};
//         `}

//     ${(props) =>
//         props.$margin &&
//         css`
//             margin: ${props.$margin};
//         `}

//   &.ant-btn-primary {
//         border: none;
//         box-shadow: none;
//         color: ${(props) =>
//             props.$color || props?.theme?.colors?.primaryLighter} !important;
//         background: ${(props) =>
//             props.$backgroundColor || props.theme?.colors?.primary} !important;
//         border: 1px solid ${(props) => props?.theme?.colors?.primaryLight} !important;
//     }

//     &.ant-btn-primary:hover {
//         background-color: ${(props) =>
//             props.$hoverBackgroundColor ||
//             props?.theme?.colors?.primaryDark} !important;
//         color: ${(props) =>
//             props?.$color || props?.theme?.colors?.primary} !important;
//     }

//     &.ant-btn-primary:active,
//     &.ant-btn-primary.active {
//         background: ${({ theme }) => theme?.colors?.primaryDark};
//     }

//     &.ant-btn-primary:disabled {
//         background: ${({ theme }) => theme?.colors?.secondary} !important;
//         border-radius: ${(props) => props?.$borderRadius || '20px'} !important;
//     }

//     &.ant-btn-link {
//         padding: 0;
//         border: none;
//         text-decoration: underline;
//         &:not(:disabled):hover {
//             border-color: none;
//             box-shadow: none;
//         }
//     }

//     &.ant-btn-text {
//         border: none !important;
//         background: transparent !important;
//         box-shadow: none !important;
//         color: ${(props) =>
//             props.$color || props?.theme?.colors?.primary} !important;
//         font-size: ${(props) => props?.theme?.fontSize?.md};
//         font-weight: ${(props) => props?.theme?.fontWeight?.semiBold};
//     }

//     &.ant-btn-default {
//         span {
//             color: ${(props) =>
//                 props.$color || props?.theme?.colors?.primary} !important;
//         }
//         border-color: ${(props) => props?.theme?.colors?.primary};

//         &.ant-btn-background-ghost {
//             background-color: ${(props) =>
//                 props?.theme?.colors?.newtralDark} !important;
//             color: ${(props) =>
//                 props.$color ||
//                 props?.theme?.colors?.newtralLightest} !important;
//             border: none;
//         }

//         &.ant-btn-background-ghost:active,
//         &.ant-btn-background-ghost.active,
//         &.ant-btn-background-ghost:hover,
//         &.ant-btn-background-ghost.hover {
//             color: ${(props) =>
//                 props?.theme?.colors?.newtralLightest} !important;
//             box-shadow: none;
//         }
//     }

//     &.ant-btn-default:hover {
//         box-shadow: none;
//         span {
//             color: ${(props) =>
//                 props.$hoverColor ||
//                 props?.theme?.colors?.primaryLighter} !important;
//         }
//         color: ${(props) =>
//             props.$hoverColor ||
//             props?.theme?.colors?.primaryLighter} !important;
//         border-color: ${(props) =>
//             props?.theme?.colors?.primaryLighter} !important;
//         background-color: ${(props) =>
//             props.$hoverBackgroundColor ||
//             props?.theme?.colors?.primary} !important;
//         ${(props) => props?.$isCancel && css``}
//     }

//     &.ant-btn-default:disabled {
//         color: ${({ theme }) => theme?.colors?.secondaryLighter} !important;

//         border-radius: ${(props) => props?.$borderRadius || '8px'} !important;
//         border-color: ${({ theme }) =>
//             theme?.colors?.secondaryLighter} !important;
//     }
// `
