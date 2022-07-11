import styled from "styled-components";

export const HomeWapper = styled.div`
    width: 100%;
    height: 100vh;
    .ant-layout {
        height: 100%;
    }
    .back {
        position: absolute;
        right: 50px;
        top: 0;
    }
    .ant-layout-content {
        height: 100%;
        padding: 20px;
        overflow: scroll;
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
        &::-webkit-scrollbar {
            display: none;
        }
    }
`