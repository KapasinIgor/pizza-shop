import React from "react";
import styles from "./NotFoundBlock.module.scss"

function NotFoundBlock() {
    return (
        <div className={styles.root}>
            <h1>Ошибка 404!</h1>
            <h2>Страница не найдена :(</h2>
        </div>
    )
}

export default NotFoundBlock