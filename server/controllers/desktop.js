import { db } from "../config/config.js"

const state = "active"

export const getAllDesktop = (req, res) => {
    const q = "SELECT a.* FROM des_desktop a JOIN uda_userDesktop b WHERE b.use_id = ? AND a.des_id = b.des_id AND a.des_id <> ? AND a.des_state = 'active' AND b.uda_state = 'active'"

    const values = [
        req.params.use_id,
        req.params.last_id
    ]

    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json(err)
        } 
        const { q } = req.query

        if (q) {
            const keys = ["des_title"]

            const search = (data) => {
                return data.filter((item) => 
                    keys.some((key) => item[key].toLowerCase().includes(q))
                )
            }           
            return res.status(200).json(search(data))      
        } else {
            return res.status(200).json(data)
        }
    })
}

export const getLastDesktop = (req, res) => {
    const q = "SELECT * FROM des_desktop WHERE des_id = ? AND des_state = 'active'"

    const values = [
        req.params.des_id
    ]

    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(400).json(err)
        }
        return res.status(200).json(data)
    })
}

export const postDesktop = (req, res) => {
    const q = "INSERT INTO des_desktop (des_title, des_description, des_state, des_createdAt) VALUES (?)"

    const values = [
        req.body.des_title,
        req.body.des_description,
        state,
        req.body.des_createdAt
    ]

    db.query(q, [values], (err, data) => {
        if (err) {
            return res.status(500).json("Houve um erro ao criar a área de trabalho 1.")
        }
        const q = "SELECT LAST_INSERT_ID(des_id) AS id FROM des_desktop ORDER BY des_id DESC LIMIT 1"

        db.query(q, (err, data) => {
            if (err) {
                const q = "DELETE FROM des_desktop WHERE des_id = ?"
                db.query(q, data[0].id, (err, data) => {
                    if (err) {
                        return res.status(500).json("Houve um erro ao criar a área de trabalho 2.")
                    }
                    return res.status(500).json("Houve um erro ao criar a área de trabalho 3.")
                })
            } else {
                const last_id = data[0].id

                const q = "INSERT INTO uda_userDesktop (uda_state, uda_createdAt, use_id, des_id, per_id) VALUES (?)"

                const values = [
                    state,
                    req.body.des_createdAt,
                    req.params.use_id,
                    last_id,
                    '1'
                ]

                db.query(q, [values], (err, data) => {
                    if (err) {
                        const q = "DELETE FROM des_desktop WHERE des_id = ?"

                        db.query(q, last_id, (err, data) => {
                            if (err) {
                                return res.status(500).json("Houve um erro ao criar a área de trabalho 4.")
                            }
                            return res.status(500).json("Houve um erro ao criar a área de trabalho 5.")
                        })
                    }
                    return res.status(200).json(last_id)
                })
            }
        })
    })
}

export const patchDesktop = (req, res) => {
    const q = "UPDATE des_desktop SET des_title = ?, des_description = ?, des_state = ? WHERE des_id = ?"

    const values = [
        req.body.des_titleUpdated, 
        req.body.des_descriptionUpdated, 
        state, 
        req.params.des_id
    ]
  
    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(400).json(err)
        }
        req.io.emit('desktopUpdated')

        return res.status(200).json("Área de Trabalho atualizada!")
    })
}

export const deleteDesktop = (req, res) => {
    const q = "UPDATE des_desktop SET des_state = 'disabled' WHERE des_id = ?"

    const values = [
        req.params.des_id
    ]
  
    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(400).json(err)
        }
        req.io.emit('desktopDeleted', {des_id: req.params.des_id})

        return res.status(200).json("Área de Trabalho excluída!")
    })
}

