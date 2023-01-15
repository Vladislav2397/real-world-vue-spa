<template lang="pug">

.auth-page: .container.page: .row: .col-md-6.offset-md-3.col-xs-12
    h1.text-xs-center Sign up
    p.text-xs-center
        router-link(
            v-if="isRegisterMode"
            :to="{ name: $routesNames.authLogin }"
        ) Have an account?
        router-link(
            v-else=""
            :to="{ name: $routesNames.authRegister }"
        ) Need an account?

    common-errors-list(
        :errors="errors"
    )

    form
        fieldset(
            :disabled="isLoading"
        )
            fieldset.form-group(
                v-if="isRegisterMode"
            )
                input.form-control.form-control-lg(
                    v-model="username"
                    type="text"
                    placeholder="Your Name"
                    required="true"
                )
            fieldset.form-group
                input.form-control.form-control-lg(
                    v-model="email"
                    type="text"
                    placeholder="Email"
                    required="true"
                )
            fieldset.form-group
                input.form-control.form-control-lg(
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    required="true"
                )
        common-loader.pull-xs-right(
            v-if="isLoading"
            :size="5"
            :margin="0"
        )
        button.btn.btn-lg.btn-primary.pull-xs-right(
            v-else=""
            class=""
            @click="authAction"
        ) {{ isRegisterMode ? "Sign up" : "Sign in" }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

import { ErrorList, Loader } from "@/shared/ui"

import { userModel } from "@/entities/user"

import { isArrayOfStrings } from "@/utils/ArrayUtils"

export enum AuthPageMode {
    Register = "Register",
    Login = "Login",
}

@Component({
    components: {
        "common-loader": Loader,
        "common-errors-list": ErrorList,
    },
})
export default class AuthPage extends Vue {
    @Prop({ required: true }) mode!: AuthPageMode

    isLoading = false

    username = ""
    email = ""
    password = ""

    errors?: string[] = []

    User = userModel.useUserModule(this.$store)

    mounted(): void {
        this.errors = []
    }

    get hasErrors(): boolean {
        return !!this.errors?.length
    }

    get isRegisterMode(): boolean {
        return this.mode === AuthPageMode.Register
    }

    async authAction(): Promise<void> {
        this.errors = []

        this.isLoading = true
        try {
            this.isRegisterMode
                ? await this.User.register({
                      email: this.email,
                      password: this.password,
                      username: this.username,
                  })
                : await this.User.login({
                      email: this.email,
                      password: this.password,
                  })
            this.$router.push({ name: this.$routesNames.home })
        } catch (e) {
            if (isArrayOfStrings(e)) {
                this.errors = e as string[]
            } else {
                throw e
            }
        } finally {
            this.isLoading = false
        }
    }
}
</script>
