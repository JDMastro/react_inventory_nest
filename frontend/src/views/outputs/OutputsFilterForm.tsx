import { Box, Grid, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import Can from "../../components/can";
import { SelectWrapperUi } from "../../components";
import { StatusRequest } from "../../services/statusService";

export function OutputsFilterForm({ handleFormFilterSubmit }: any) {
    const [statu, setStatu] = useState("")
    const [status, setStatus] = useState([])

    useEffect(() => { StatusRequest.findStatusEmployee().then(elements => setStatus(elements)) }, [])

    return (
        <Box component="form" m={2}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Can
                        perform="users:create"
                        yes={() => (
                            <SelectWrapperUi
                                label='Estados'
                                name="statu"
                                value={statu}
                                onChange={(evt: any) => { setStatu(evt.target.value); handleFormFilterSubmit(evt.target.value) }}
                                menuItems={
                                    status.map(
                                        (currentStatu: any) => (
                                            <MenuItem value={currentStatu.id} key={currentStatu.id}>
                                                {currentStatu.name}
                                            </MenuItem>
                                        ))
                                }
                                error={""}
                            />
                        )}
                    />

                </Grid>
            </Grid>
        </Box>
    )
}